
import     "react-datepicker/dist/react-datepicker.css";

import styles from "./home.module.css";
import { SearchInput } from "../../components/search_input/searchInput";
import { TopDestination } from '../../components/topdistnation/topdisnation';
import { Recentserch } from '../../components/Your recent searches/trecnt_searches';
import { Trendinrserch } from '../../components/Trending search/Trending _search';
export function Homepage() {
  

  return (
    <div className={styles["main_container"]}>

       
     <SearchInput></SearchInput>


     
      <Recentserch/>
     

      <Trendinrserch/>
   

  
     <TopDestination/>
    </div>
  );
}
