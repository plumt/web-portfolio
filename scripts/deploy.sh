#!/usr/bin/env bash
# 빌드 확인 → 커밋 → 푸시 → GitHub Actions 배포 확인까지 한 번에 실행한다.
#   사용: scripts/deploy.sh "커밋 메시지"        (변경이 있으면 커밋하고 푸시)
#         scripts/deploy.sh                       (이미 커밋된 내용만 푸시)
#         scripts/deploy.sh --no-watch "메시지"   (배포 결과를 기다리지 않음)
#
# 저장소 소유자만 쓸 수 있다. 스크립트가 공개돼 있어도 다음 때문에 다른 사람은 푸시할 수 없다.
#   1) GitHub 가 쓰기 권한이 없는 계정의 푸시를 거부한다 (실제 차단은 이쪽이다).
#   2) 이 스크립트는 그 전에 로그인 계정과 저장소 권한을 확인하고 중단한다.
# 토큰·비밀번호는 스크립트에 넣지 않는다. 인증은 `gh auth login` 으로 한 계정을 쓴다.
set -euo pipefail

OWNER="plumt"
REPO="web-portfolio"
BRANCH="main"
WATCH=1

die() { echo "중단: $*" >&2; exit 1; }

# 옵션 처리
MSG=""
for arg in "$@"; do
  case "$arg" in
    --no-watch) WATCH=0 ;;
    -h|--help) sed -n '2,10p' "$0"; exit 0 ;;
    *) MSG="$arg" ;;
  esac
done

cd "$(git rev-parse --show-toplevel)"

# 1) 대상 저장소 확인 — 포크나 다른 저장소에서 실행되는 것을 막는다.
remote_url="$(git remote get-url origin 2>/dev/null || true)"
case "$remote_url" in
  *"github.com/$OWNER/$REPO"*|*"github.com:$OWNER/$REPO"*) ;;
  *) die "origin 이 $OWNER/$REPO 가 아닙니다 ($remote_url)" ;;
esac

# 2) 로그인 계정과 권한 확인
command -v gh >/dev/null || die "gh(GitHub CLI)가 필요합니다. 설치 후 gh auth login"
login="$(gh api user --jq .login 2>/dev/null)" || die "gh 로그인이 필요합니다 (gh auth login)"
[ "$login" = "$OWNER" ] || die "로그인 계정($login)이 소유자($OWNER)가 아닙니다"
can_push="$(gh api "repos/$OWNER/$REPO" --jq .permissions.push 2>/dev/null || echo false)"
[ "$can_push" = "true" ] || die "$OWNER/$REPO 에 쓰기 권한이 없습니다"

# 3) 브랜치와 원격 상태 확인
branch="$(git rev-parse --abbrev-ref HEAD)"
[ "$branch" = "$BRANCH" ] || die "$BRANCH 브랜치에서만 배포합니다 (현재: $branch)"
git fetch -q origin "$BRANCH"
if [ -n "$(git rev-list HEAD..origin/$BRANCH)" ]; then
  die "원격에 로컬에 없는 커밋이 있습니다. 먼저 git pull --rebase 하세요"
fi

# 4) 빌드 확인 — 깨진 상태로는 푸시하지 않는다.
[ -d node_modules ] || npm ci
echo "▶ 빌드 확인"
npm run build >/dev/null || die "빌드 실패. 위 오류를 고친 뒤 다시 실행하세요"

# 5) 커밋 — 무시되지 않은 모든 변경을 포함한다. 올라가기 전에 목록을 보여준다.
if [ -n "$(git status --porcelain)" ]; then
  [ -n "$MSG" ] || die "커밋할 변경이 있습니다. 커밋 메시지를 인자로 주세요"
  git add -A
  echo "▶ 커밋할 파일"
  git status --short
  git commit -q -m "$MSG"
fi

# 6) 푸시할 것이 있는지 확인하고 푸시
ahead="$(git rev-list --count origin/$BRANCH..HEAD)"
[ "$ahead" -gt 0 ] || { echo "푸시할 커밋이 없습니다."; exit 0; }
echo "▶ 푸시 ($ahead 커밋)"
git push origin "$BRANCH"

# 7) 배포 확인 — push 로 시작된 Actions 실행을 기다린다.
[ "$WATCH" -eq 1 ] || { echo "푸시 완료. 배포는 Actions 에서 확인하세요."; exit 0; }
sha="$(git rev-parse HEAD)"
echo "▶ 배포 실행 대기"
run_id=""
for _ in 1 2 3 4 5 6 7 8 9 10; do
  run_id="$(gh run list -R "$OWNER/$REPO" --workflow deploy.yml --commit "$sha" --json databaseId --jq '.[0].databaseId' 2>/dev/null || true)"
  [ -n "$run_id" ] && break
  sleep 3
done
[ -n "$run_id" ] || die "배포 실행을 찾지 못했습니다. Actions 탭에서 확인하세요"
gh run watch "$run_id" -R "$OWNER/$REPO" --exit-status >/dev/null && echo "✔ 배포 완료" || die "배포 실패: gh run view $run_id -R $OWNER/$REPO --log-failed"
page="$(gh api "repos/$OWNER/$REPO/pages" --jq .html_url 2>/dev/null || true)"
[ -n "$page" ] && echo "주소: $page"
