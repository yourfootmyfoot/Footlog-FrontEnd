import styles from './com.module.css';

function Com() {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>여기도 제대로 나오나</h1>
      <h2>준수 시작입니다.</h2>
      <div style={{ font: '2rem bold', color: 'blue' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea eligendi
        aspernatur cupiditate laudantium illum voluptates optio numquam? Itaque
        ipsam repudiandae iste blanditiis ea placeat, quisquam accusantium sed
        quos optio? Voluptate.
      </div>
      <h2>준수 시작입니다.</h2>
      <h2>준수 시작입니다.</h2>
      <h2>준수 시작입니다.</h2>
      <h2>준수 시작입니다.</h2>
      <h2>준수 시작입니다.</h2>
      <h2>준수 시작입니다.</h2>

      <div
        className={styles.fontColor}
        style={{ font: '2rem bold', color: 'yellow' }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea eligendi
        aspernatur cupiditate laudantium illum voluptates optio numquam? Itaque
        ipsam repudiandae iste blanditiis ea placeat, quisquam accusantium sed
        quos optio? Voluptate.
      </div>
      <div style={{ font: '2rem bold' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea eligendi
        aspernatur cupiditate laudantium illum voluptates optio numquam? Itaque
        ipsam repudiandae iste blanditiis ea placeat, quisquam accusantium sed
        quos optio? Voluptate.
      </div>
      <div style={{ font: '2rem bold' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea eligendi
        aspernatur cupiditate laudantium illum voluptates optio numquam? Itaque
        ipsam repudiandae iste blanditiis ea placeat, quisquam accusantium sed
        quos optio? Voluptate.
      </div>
      <h2>준수 페이지 끝</h2>
    </div>
  );
}

export default Com;
