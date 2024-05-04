import { SelectLabel, TextField } from "@saurabh-chauhan/sc-components-library";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { RefObject, useCallback, useState } from "react";
import { IData } from "../../helpers/types";
import { fetchJobInfo } from "../../service/fetchInfo.service";
import InfiniteScroll from "../InfiniteScroller";
import styles from "./Card.module.scss";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";
import { EXP_MAP, ROLE_MAP } from "./constant";

interface IPageOptions {
  currentPage: number;
  hasNext: boolean;
}

interface ICard {
  ref: RefObject<HTMLElement>;
}

interface IFilters {
  companyName: string;
  exp: string;
  role: string;
}

const Card: React.FC<ICard> = ({ ref }) => {
  const [cardData, setCardData] = useState<any>([]);
  const [pageOptions, setPageOptions] = useState<IPageOptions>({
    currentPage: 1,
    hasNext: true,
  });

  const [filters, setFilters] = useState<IFilters>({
    role: "",
    exp: "",
    companyName: "",
  });

  const { currentPage } = pageOptions;

  const fetchData = useCallback(
    async ({
      pageParam,
    }: {
      pageParam: number;
    }): Promise<{
      data: IData[];
      currentPage: number;
      nextPage: number;
    }> => {
      console.log(pageParam, currentPage);
      const payload = { offset: pageParam, limit: 10 };
      const response = await fetchJobInfo(JSON.stringify(payload));
      const updatedDataArr = [...cardData, ...(response?.jdList || [])];
      const uniqueById = Array.from(
        new Set(updatedDataArr.map((item) => item.jdUid))
      ).map((id) => updatedDataArr.find((item) => item.jdUid === id));
      setCardData([...uniqueById] as IData[]);
      setPageOptions((prev) => ({
        ...prev,
        currentPage: pageParam,
        hasNext: response.totalCount > 0,
      }));
      return {
        data: response.jdList ?? [],
        currentPage: pageParam,
        nextPage: pageParam + 1,
      };
    },
    [currentPage]
  );

  const { error, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["jobPosts"],
    queryFn: fetchData,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    refetchOnMount: false,
  });

  const applyFilters = (data: IData[], filters: IFilters) => {
    return data?.filter((item) => {
      // Filter by experience
      if (filters.exp) {
        const itemMinExp = item.minExp || 0;
        if (!(parseInt(filters.exp) >= itemMinExp)) {
          return false;
        }
      }

      // Filter by role
      if (filters.role && !item.jobRole.includes(filters.role)) {
        return false;
      }

      // Filter by company name
      if (
        filters.companyName &&
        !item.companyName
          .toLowerCase()
          .includes(filters.companyName.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  };

  const applyFilter = () => {
    const filteredData = applyFilters(cardData, filters);
    return filteredData;
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <SelectLabel
          label={"Experience"}
          options={EXP_MAP}
          onChange={(newValue: any) =>
            setFilters((prev) => ({ ...prev, exp: newValue.value }))
          }
        />
        <SelectLabel
          label={"Role"}
          options={ROLE_MAP}
          onChange={(newValue: any) =>
            setFilters((prev) => ({ ...prev, role: newValue.value }))
          }
        />
        <TextField
          label="Search Company"
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, companyName: e.target.value }))
          }
        />
      </div>
      <section className={styles.cardContainer}>
        <InfiniteScroll
          rootRef={ref?.current!}
          hasMore={hasNextPage || !isFetching}
          currentIndex={currentPage}
          onIntersect={() => !isFetching && fetchNextPage()}
          hideEndText
        >
          {!error ? (
            <>
              {applyFilter()?.map((item) => {
                return (
                  <div key={`card-${item.jdUid}`} className={styles.card}>
                    <CardHeader data={item} />
                    <CardBody data={item} />
                    <CardFooter data={item} />
                  </div>
                );
              })}
            </>
          ) : (
            <p>{error.message}</p>
          )}
        </InfiniteScroll>
      </section>
    </div>
  );
};

export default Card;
