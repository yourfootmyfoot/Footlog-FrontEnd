module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'Feat', // 새로운 기능 추가
        'Fix', // 버그 수정
        'Docs', // 문서 수정
        'Style', // 코드 포맷팅, 세미콜론 누락 등
        'Refactor', // 코드 리팩토링
        'Test', // 테스트 코드 추가
        'Chore', // 빌드 업무 수정 등
        'Comment', // 주석 추가 및 변경
        'Remove', // 파일, 폴더 삭제
        'Rename', // 파일, 폴더명 수정
      ],
    ],
    'subject-empty': [2, 'never'], // 제목은 비어있을 수 없음
    'subject-case': [2, 'always', ['sentence-case']], // 제목은 문장형식 (첫 글자만 대문자)
    'header-max-length': [2, 'always', 72], // 제목 최대 길이 제한
  },
  ignores: [
    (commit) => commit.includes('Merge'), // Merge 커밋은 무시
  ],
};
