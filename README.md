## HEXACEPS APP INSTALL GUIDE

### [CAUTION] 주의사항

- 소스코드 안에 InteliJ (백엔드), React (프론트) 의 초기 설정이 되어 있습니다
- 본인이 미리 세팅한 폴더에서 github를 설정 또는 Migration 하지마세요
- 소스코드 작성시 기존에 로컬에서 개발 중이 었던 파일을 덮었는 복사, 붙여넣기로 파일자체를 이동하지 말고, 소스코드를 비교해 가면서 코드 단위로 옮겨 주세요.
   - github 에 있는 설정을 덮을수 있습니다 (대형사고)
   - github 세팅을 맞춰가면서 개발을 해야 오류나 에러를 줄일 수 있습니다
   - 개인이 개발하는 코드는 메서드 단위나 파일 단위로 반드시 동작 하는지 확인해 주세요
      - 여러개의 메서드를 개발하고 테스트나 동작을 확인 하지 않고 커밋 하면 문제가 발생합니다 (최소한 본인 자리에서 제대로 동작하는지 확인해 주세요)
   - 자주 git pull {원하는 이름} main 을 사용해 소스코드 충돌을 방지 하고, 최신화 상태를 유지해 주세요 (기본 중의 기본)

### 1. github setting

- 소스작업 할 폴더 생성 # mkdir {작업 폴더 이름}
- 생성한 폴더 진입 # cd {작업 폴더 이름}
- github 초기화 # git init
- github 유저 및 이메일 설정
   - git config --global user.name {"user_name"}
   - git config --global user.email {"user_email"}
- github 원격 연결 설정 : 본인이 작업하는 PC가 local, github가 remote가 됩니다
   - git remote add {원하는 이름} "깃허브주소복사.git"
   - ex) git remote add hexaceps https://github.com/hexaceps/Hexaceps.git
   - [!] {원하는 이름}으로 나중에 원격으로 push를 보내야 하므로 너무 긴 이름은 사용하지 마세요
- github 소스코드 가져오기
   - git pull {원하는 이름} main # main 이 안되면 master
- 커멘드 창에 현재 연결된 상태를 확인
  - git remote -v
- github branch 생성
  - 슬랙을 참고하거나 구글링 하세요

### 2. 개발 환경 IDE 설정

- 백엔드 설정
  - 1번 스텝을 진행 후 InteliJ 실행
  - 폴더 선택 후 프로젝트 열기 /{작업 폴더}/intelliJ/hexa-qna
  - 자동으로 gradle build 동작 하고 빌드 세팅 완료 확인 후 app 실행
  - port 및 db loading 확인
  - /{작업 폴더}/intelliJ/hexa-qna 폴더 내 READEME.md 파일이 있다면 삭제
    - READEME.md 파일은 반드시 /{작업 폴더}/ 최상단에만 존재 해야 함 (git push 이후 충동 생김)

 - 프론트 설정
   - 1번 스텝을 진행 후 VSCODE 실행
   - 폴더 선택 후 프로젝트 열기 /{작업 폴더}/react
   - vscode 터미널이나 cmd를 열고 /{작업 폴더}/react 로 이동
   - src,public 등 폴더가 있고 package.json 있는지 확인
   - npm install 실행
   - node module 설치 되었는지 확인
   - /{작업 폴더}/react 폴더 내 READEME.md 파일이 있다면 삭제
      - READEME.md 파일은 반드시 /{작업 폴더}/ 최상단에만 존재 해야 함 (git push 이후 충동 생김)
   
