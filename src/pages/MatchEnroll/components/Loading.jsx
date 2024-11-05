function BouncingBallSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative flex space-x-2">
        <div style={{animationDelay:'0s'} }className="w-6 h-6 bg-blue-500 rounded-full animate-bounce-custom animation-delay-0"></div>
        <div style={{animationDelay:'0.5s'} }className="w-6 h-6 bg-blue-500 rounded-full animate-bounce-custom animation-delay-500"></div>
        <div style={{animationDelay:'1s'} }className="w-6 h-6 bg-blue-500 rounded-full animate-bounce-custom animation-delay-1000"></div>
      </div>
    </div>
  );
}

export default BouncingBallSpinner;
