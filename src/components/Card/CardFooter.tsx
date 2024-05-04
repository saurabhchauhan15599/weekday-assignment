import { Button } from "@saurabh-chauhan/sc-components-library";
import React from "react";
import { IData } from "../../helpers/types";
import styles from "./Card.module.scss";

interface ICardFooter {
  data: IData;
}

const CardFooter: React.FC<ICardFooter> = ({ data }) => {
  return (
    <Button variant="contained" className={styles.btn}>
      <a
        className={styles.btnTitle}
        href={data?.jdLink}
        target="_blank"
        rel="no-referrer"
      >
        Ease in apply
      </a>
    </Button>
  );
};

export default CardFooter;
