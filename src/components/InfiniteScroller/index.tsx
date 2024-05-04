import { Button, Spinner } from "@saurabh-chauhan/sc-components-library";
import {
  Fragment,
  ReactNode,
  Ref,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import css from "./index.module.scss";

interface InfiniteScrollProps {
  hasMore: boolean;
  hideEndText?: boolean;
  rootRef?: Element;
  targetRef?: Ref<Element>;
  children?: ReactNode;
  onIntersect?: (newIndex: number) => void;
  currentIndex: number;
  retry?: boolean;
}

function InfiniteScroll(props: InfiniteScrollProps) {
  const {
    rootRef,
    children,
    hasMore,
    onIntersect,
    currentIndex,
    hideEndText,
    retry = false,
  } = props;
  const targetRef = useRef<HTMLSpanElement>(null);

  const intersectionObserverCallback: IntersectionObserverCallback =
    useCallback(
      (entries, observer) => {
        if (entries[0].isIntersecting && hasMore) {
          observer.disconnect();
          onIntersect?.(currentIndex + 1);
        }
      },
      [props.currentIndex, props.onIntersect, props.hasMore]
    );

  useLayoutEffect(() => {
    const { rootRef } = props;

    const options: IntersectionObserverInit = {
      root: rootRef ?? document,
      rootMargin: "0px 0px 1000px 0px",
    };

    const observer = new IntersectionObserver(
      intersectionObserverCallback,
      options
    );
    if (targetRef.current) observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [rootRef, intersectionObserverCallback]);

  const handleLoadMore = useCallback(() => {
    const { currentIndex, onIntersect } = props;
    onIntersect?.(currentIndex + 1);
  }, [onIntersect, currentIndex]);

  return (
    <Fragment>
      {children}
      <span ref={targetRef} aria-hidden className={css.loadingWrapper}>
        {hasMore ? (
          !retry ? (
            <Spinner />
          ) : (
            <Button variant="text" onClick={handleLoadMore}>
              Load More
            </Button>
          )
        ) : (
          !hideEndText && (
            <span>
              Take a deep breath & relax, you have reached end &#128640;
            </span>
          )
        )}
      </span>
    </Fragment>
  );
}

export type { InfiniteScrollProps };

export default InfiniteScroll;
