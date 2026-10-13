import styles from "@/components/Shared/BouncingLoader.module.css";
const BouncingLoader = () => {
  return (
    <div
      aria-label="loading"
      data-loading={true}
      role="status"
      className={styles.styledBouncingLoader}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
export default BouncingLoader;
