import { Typography } from "@saurabh-chauhan/sc-components-library";
import React, { useState } from "react";
import { IData } from "../../helpers/types";
import styles from "./Card.module.scss";
import Modal from "../Modal/Modal";

interface ICardBody {
  data: IData;
}

const CardBody: React.FC<ICardBody> = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.body}>
      <div>
        <Typography className={styles.title}>About Company</Typography>
        <Typography className={styles.jobDesc}>
          {data.jobDetailsFromCompany}
        </Typography>
      </div>
      <div className={styles.showMore}>
        <Typography className={styles.text} onClick={() => setOpen(!open)}>
          Show More
        </Typography>
      </div>
      <div className={styles.workEx}>
        <Typography className={styles.workTitle}>Minimum Experience</Typography>
        <Typography className={styles.exp}>{data.minExp} years</Typography>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} hideCloseButton>
        <div className={styles.modal}>
          <Typography className={styles.title}>About Company</Typography>
          <Typography className={styles.jobDesc}>
            {data.jobDetailsFromCompany}
          </Typography>
        </div>
      </Modal>
    </section>
  );
};

export default CardBody;
