module.exports = {
  extends: ['@commitlint/config-conventional'],
  defaultIgnores: false,
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'Feat',      // 새로운 기능 추가
        'Fix',       // 버그 수정
        'Docs',      // 문서 수정
        'Style',     // 코드 포맷팅, 세미콜론 누락 등
        'Refactor',  // 코드 리팩토링
        'Test',      // 테스트 코드 추가
        'Chore',     // 빌드 업무 수정 등
        'Comment',   // 주석 추가 및 변경
        'Remove',    // 파일, 폴더 삭제
        'Rename',    // 파일, 폴더명 수정
      ],
    ],
    'type-case': [2, 'always', 'pascal-case'], // 타입은 첫 글자만 대문자
    'subject-empty': [2, 'never'], // 제목은 비어있을 수 없음
    'subject-case': [2, 'never', []], // 제목의 대소문자 규칙 무시
    'header-max-length': [2, 'always', 72], // 제목 최대 길이 제한
    'body-leading-blank': [1, 'always'], // 본문 앞 빈 줄 (경고로 변경)
  },
  ignores: [
    (commit) => commit.includes('Merge'), // Merge 커밋 무시
    (commit) => /^(feat|fix|docs|style|refactor|test|chore|comment|remove|rename):/i.test(commit), // 이전 형식의 커밋 무시
  ],
};