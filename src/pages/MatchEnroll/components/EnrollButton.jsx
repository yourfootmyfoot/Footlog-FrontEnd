import { useHistory } from 'react-router-dom';

function EnrollMatchButton() {
  const history = useHistory();

  const routeToMatchEnrollPage = () => {
    history.push('/match/enroll');
  };

  return (
    <div className="fixed bottom-20 translate-x-40 z-9">
      <button
        onClick={routeToMatchEnrollPage}
        className="bg-main text-white w-10 h-10 rounded-full text-2xl flex justify-center items-center shadow-lg z-99"
      >
        +
      </button>
    </div>
  );
}

export default EnrollMatchButton;
