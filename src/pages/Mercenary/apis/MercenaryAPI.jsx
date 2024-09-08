// JSON 파일로부터 매치 정보를 가져와서 여러 가지 함수로 검색 및 필터링하는 모듈
import mercenariesApp from '../data/MercenaryApp.json';

// mercenaryAppList
export function getMercenaryAppList() {

    return mercenariesApp;
}

// MercenaryApp 정보를 가져온다.
export function getMercenaryAppInfo(MercenaryAppCode) {
    console.log(mercenariesApp);

    return mercenariesApp.filter(mercenary => mercenary.Code === parseInt(MercenaryAppCode))[0];
}