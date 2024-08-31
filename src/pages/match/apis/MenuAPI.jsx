// JSON 파일로부터 매치 정보를 가져와서 여러 가지 함수로 검색 및 필터링하는 모듈
import matches from '../data/match-detail.json';

// matches
export function getMatchList() {

    return matches;
}

// 
export function getMatchDetail(matchCode) {

    return matches.filter(match => match.matchCode === parseInt(matchCode))[0];
}

export function searchMatch(searchMatchName) {
    return matches.filter(match => match.matchName.match(searchMatchName));
}