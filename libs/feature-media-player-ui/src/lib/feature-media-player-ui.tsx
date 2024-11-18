import styles from './feature-media-player-ui.module.css';

/* eslint-disable-next-line */
export interface FeatureMediaPlayerUiProps {}

export function FeatureMediaPlayerUi(props: FeatureMediaPlayerUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to FeatureMediaPlayerUi!</h1>
    </div>
  );
}

export default FeatureMediaPlayerUi;
