import {
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useIntersectionObserver from '../../../state/hooks/useIntersectionObserver';

export type TTypingEffect = {
  text: string;
  timeTyping?: number;
  timeDelete?: number;
  timeDelayTyping?: number;
  timeDelayDelete?: number;
  positionDelayTyping?: number;
} & ComponentPropsWithoutRef<'a'>;

// eslint-disable-next-line react/display-name
const TypingEffect = forwardRef<HTMLAnchorElement, TTypingEffect>(
  (
    {
      text,
      timeTyping = 250,
      timeDelete = 100,
      timeDelayTyping = 10000,
      timeDelayDelete = 500,
      positionDelayTyping = 2,
      className,
      href,
      ...spanProps
    },
    _ref
  ) => {
    const timeTypingInterval = useRef<NodeJS.Timer>();
    const typingEffectRef = useRef<null | HTMLAnchorElement>(null);
    const entry = useIntersectionObserver(typingEffectRef, {
      threshold: 1,
      freezeOnceVisible: true,
    });
    const isVisible = !!entry?.isIntersecting;
    const [wordEffect, setWordEffect] = useState('');
    const [reverse, setReverse] = useState(false);
    const [delayTyping, setDelayTyping] = useState(0);
    const arrText = useMemo(() => text.split(''), [text]);

    useEffect(() => {
      if (isVisible)
        timeTypingInterval.current = setInterval(
          () => {
            if (delayTyping <= 0) {
              setWordEffect((wordEffect) => {
                const wordTyping = wordEffect + arrText[wordEffect.length];

                if (wordTyping.length === arrText.length && !reverse) {
                  setReverse(true);
                  setDelayTyping(timeDelayTyping);
                }

                if (wordEffect.length === 1 && reverse) {
                  setReverse(false);
                  setDelayTyping(timeDelayDelete);
                }

                if (wordTyping.length === positionDelayTyping) {
                  setDelayTyping(timeTyping * 2);
                }

                return wordEffect.length < arrText.length && !reverse
                  ? wordTyping
                  : wordEffect.slice(0, wordEffect.length - 1);
              });
            } else {
              setDelayTyping((delay) => (delay -= timeTyping));
            }
          },
          !reverse ? timeTyping : timeDelete
        );

      return () => clearInterval(timeTypingInterval.current);
    }, [
      isVisible,
      reverse,
      delayTyping,
      arrText,
      timeTyping,
      timeDelete,
      timeDelayDelete,
      timeDelayTyping,
      positionDelayTyping,
    ]);

    return (
      <a
        {...spanProps}
        ref={typingEffectRef}
        href={href}
        className={`tracking-wider cursor-pointer ${className}`}
      >
        {wordEffect}
        <span className="animate-[typing_1s_infinite]">_</span>
      </a>
    );
  }
);

export default TypingEffect;
