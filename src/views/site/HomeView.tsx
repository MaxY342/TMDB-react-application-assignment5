import { Button } from '@/components';
import { useNavigate } from 'react-router-dom';

export const HomeView = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      <main className="mx-auto flex max-w-7xl flex-1 flex-col items-center justify-center px-4">
        <section className="space-y-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight">TMDB Explorer</h1>
          <p className="text-lg text-gray-400">Explore movies and discover people using a fast, modern interface.</p>
          <Button onClick={() => navigate('"/movies/category/now_playing"')}>Enter</Button>
        </section>
      </main>
    </div>
  );
};
