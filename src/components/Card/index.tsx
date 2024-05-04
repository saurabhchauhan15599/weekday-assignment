import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { IAPIData, IData } from "../../helpers/types";
import { payloadObject } from "../../helpers/utils";
import { fetchJobInfo } from "../../service/fetchInfo.service";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";
import styles from "./Card.module.scss";

const Card: React.FC = () => {
  const [cardData, setCardData] = useState<IData[]>([]);

  const { mutateAsync } = useMutation({
    mutationFn: (payload: typeof payloadObject) => {
      return fetchJobInfo(payload ?? payloadObject);
    },
    onSuccess: (data: IAPIData) => {
      console.log(data);
      setCardData(data.jdList);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    mutateAsync(payloadObject);
  }, []);

  return (
    <main className={styles.cardContainer}>
      {cardData?.map((values) => (
        <div key={`card-${values.jdUid}`} className={styles.card}>
          <CardHeader data={values} />
          <CardBody data={values} />
          <CardFooter data={values} />
        </div>
      ))}
    </main>
  );
};

export default Card;
