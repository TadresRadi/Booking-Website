import React from 'react';

import styles from "./filter.module.css"
export function FilterSide() {
    return (
        <>
          <h3 className={styles.fiter_by}>Filter By </h3>
           
            <div className={styles.fliter_container}>   
                    <h4>Property facilities</h4>
                    <input type="checkbox" />  <span>wifi free</span><br />
                    <input type="checkbox" />  <span>wifi free</span><br />
                    <input type="checkbox" />  <span>wifi free</span><br />
                    <input type="checkbox" />  <span>wifi free</span><br />
                    <input type="checkbox" />  <span>wifi free</span><br />
                    <input type="checkbox" />  <span>wifi free</span><br />
                    <input type="checkbox" />  <span>wifi free</span><br />
            </div>

            <div className={styles.fliter_container}>   
                    <h4>Room amenities</h4>
                    <input type="checkbox" />  <span>wifi free</span><br />
                    <input type="checkbox" />  <span>TV       </span><br />
                    <input type="checkbox" />  <span>wifi free</span><br />
                    <input type="checkbox" />  <span>wifi free</span><br />
                    <input type="checkbox" />  <span>wifi free</span><br />
                    <input type="checkbox" />  <span>wifi free</span><br />
                    <input type="checkbox" />  <span>wifi free</span><br />
            </div>

        </>
    )
}
