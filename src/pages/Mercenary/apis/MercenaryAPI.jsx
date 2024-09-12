// JSON 파일로부터 매치 정보를 가져와서 여러 가지 함수로 검색 및 필터링하는 모듈
import mercenariesApp from '../data/MercenaryApp.json';
import mercenariesRec from '../data/MercenaryRec.json';

// 용병 할래요 페이지

// mercenaryAppList
export function getMercenaryAppList() {

    return mercenariesApp;
}

// MercenaryApp 정보를 가져온다.
export function getMercenaryAppInfo(MercenaryAppCode) {
    console.log(mercenariesApp);

    return mercenariesApp.filter(mercenary => mercenary.Code === parseInt(MercenaryAppCode))[0];
}

// 용병 구해요 페이지

// mercenaryRecList
export function getMercenaryRecList() {

    return mercenariesRec;
}

// MercenaryApp 정보를 가져온다.
export function getMercenaryRecInfo(MercenaryRecCode) {
    console.log(mercenariesRec);

    return mercenariesRec.filter(mercenary => mercenary.Code === parseInt(MercenaryRecCode))[0];
}