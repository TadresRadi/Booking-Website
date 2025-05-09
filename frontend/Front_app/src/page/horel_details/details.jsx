import styles from './details.module.css';

export function Details() {
  return (
    <div className={styles["main_container"]}>
      <div className={styles["first_div"]}></div>

      <div className={`${styles["viewdhotel_div"]} container`}>
        <div className={`${styles["viewdhotel_divv"]} row w-100 gx-3 gy-4`}>
          
          <div className={`${styles["leftside_div"]} col-3 col-md-4 col-lg-5`}></div>

          <div className={`${styles["midleside_div"]} col-4 col-md-2 col-lg-2`}>
            <div className={styles["midleside_div1"]}></div>
            <div className={styles["midleside_div2"]}></div>
          </div>

          <div className={`${styles["leftsode_div"]} col-3 col-md-4 col-lg-4`}></div>
        </div>
      </div>
    </div>




///    htela
  );
}
