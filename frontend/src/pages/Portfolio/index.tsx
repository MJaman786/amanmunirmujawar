import { Helmet } from 'react-helmet-async';
import { lazy, memo } from 'react';
import LazyLoadingWrapper from '../../common/LazyLoading';
import LayoutWrapper from '../../common/Layout';

// 1. Load the component lazily
const RenderPortfolio = lazy(() => import('../../components/Portfolio'));

// 2. Create a memoized version that won't re-render when parent state changes
const MemoizedPortfolio = memo(RenderPortfolio);

export default function Portfolio() {
  return (
    <>
      <Helmet>
        <title>Portfolio</title>
      </Helmet>

      <LazyLoadingWrapper>
        <LayoutWrapper activePage='Portfolio'>
          <MemoizedPortfolio />
        </LayoutWrapper>
      </LazyLoadingWrapper>
    </>
  );
}
