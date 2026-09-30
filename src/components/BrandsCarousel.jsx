import InfiniteDraggableSlider from './InfiniteDraggableSlider';
import styles from './BrandsCarousel.module.css';
import { brandsData } from '../data/brandsData';

function BrandsCarousel() {
  const carouselItems = [...brandsData, ...brandsData];
  return (
    <section className={styles.brands}>
      <h1 className={styles.title}>Draggable Infinite Carousel</h1>
      <p className={styles.description}>
        Drag the carousel horizontally in either direction.
      </p>
      <InfiniteDraggableSlider
        carouselItems={carouselItems}
        firstDuplicateSlideIndex={brandsData.length}
      />
    </section>
  );
}

export default BrandsCarousel;
