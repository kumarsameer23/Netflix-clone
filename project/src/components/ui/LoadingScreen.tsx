import { Circle as CircleNotch } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-netflix-black z-50">
      <CircleNotch className="animate-spin text-netflix-red" size={48} />
    </div>
  );
};

export default LoadingScreen;