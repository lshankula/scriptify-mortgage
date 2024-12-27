export const LoadingSpinner = () => {
  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
      <p className="text-sm text-gray-600">Processing your sign in...</p>
    </div>
  );
};