import { Typography } from "@saurabh-chauhan/sc-components-library";
import React from "react";
import { IData } from "../../helpers/types";
import styles from "./Card.module.scss";

interface ICardHeader {
  data: IData;
}

const CardHeader: React.FC<ICardHeader> = ({ data }) => {
  return (
    <section className={styles.header}>
      <div className={styles.jobInfo}>
        <img
          src={data.logoUrl}
          alt="logo"
          className={styles.logo}
          loading="lazy"
        />
        <div className={styles.title}>
          <Typography className={styles.companyName}>
            {data.companyName}
          </Typography>
          <Typography className={styles.position}>{data.jobRole}</Typography>
          <Typography className={styles.location}>{data.location}</Typography>
        </div>
      </div>
      <div className={styles.salaryInfo}>
        <Typography className={styles.salary}>
          Estimated Salary:{" "}
          {data.minJdSalary
            ? `${data.salaryCurrencyCode} ${data.minJdSalary + "lpa"}-`
            : ""}
          {data.maxJdSalary
            ? `${data.salaryCurrencyCode} ${data.maxJdSalary + "lpa"}`
            : ""}
        </Typography>
      </div>
    </section>
  );
};

export default CardHeader;
