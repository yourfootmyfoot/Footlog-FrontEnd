// JSON 파일로부터 매치 정보를 가져와서 여러 가지 함수로 검색 및 필터링하는 모듈
import mercenaries from '../data/Mercenary.json';

// matches
export function getMercenaryList() {

    return mercenaries;
}

// 
export function getMercenaryDetail(MercenaryCode) {
    console.log(mercenaries);

    return mercenaries.filter(match => match.matchCode === parseInt(MercenaryCode))[0];
}

export function searchMercenary(searchMercenaryName) {
    return mercenaries.filter(mercenary => mercenary.mercenaryName.match(searchMercenaryName));
}