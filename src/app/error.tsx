"use client";

function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Произошла ошибка!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Попробовать снова</button>
    </div>
  );
}
export default Error;
