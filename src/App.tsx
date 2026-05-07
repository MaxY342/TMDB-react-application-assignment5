import { MainLayout } from '@/layouts';
import {
  HomeView,
  TrendingView,
  MoviesView,
  TelevisionView,
  GenreView,
  SearchView,
  MediaView,
  CreditsView,
  ReviewsView,
  TrailersView,
  PersonView,
  SeasonsView,
  EpisodeView,
  ErrorView,
  CareerView,
  ImagesView,
} from "@/views";
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route element={<MainLayout />}>
        <Route path="/movies">
          <Route path="category/:listType" element={<MoviesView />} />
          <Route path=":id" element={<MediaView />}>
            <Route path="credits" element={<CreditsView />} />
            <Route path="trailers" element={<TrailersView />} />
            <Route path="reviews" element={<ReviewsView />} />
          </Route>
        </Route>
        <Route path="/tv">
          <Route path="category/:listType" element={<TelevisionView />} />
          <Route path=":id" element={<MediaView />}>
            <Route path="seasons" element={<SeasonsView />}>
              <Route path=":seasonNumber" element={<EpisodeView />} />
            </Route>
            <Route path="credits" element={<CreditsView />} />
            <Route path="trailers" element={<TrailersView />} />
            <Route path="reviews" element={<ReviewsView />} />
          </Route>
        </Route>
        <Route path="/people/:id" element={<PersonView />}>
          <Route path="career" element={<CareerView />} />
          <Route path="images" element={<ImagesView />} />
        </Route>
        <Route path="/trending/:mediaType" element={<TrendingView />} />
        <Route path="/genre/:mediaType/:genreId" element={<GenreView />} />
        <Route path="/search" element={<SearchView />} />
      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};
