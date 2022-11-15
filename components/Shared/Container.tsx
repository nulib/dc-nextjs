import { maxWidths } from "@/styles/containers";
import { styled } from "@/stitches.config";

interface ContainerProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  containerType?: "default" | "wide";
  isFlex?: boolean;
  maxWidth?: number;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  containerType = "default",
  isFlex = false,
  maxWidth,
}) => {
  const manualWidth = maxWidth ? { maxWidth: maxWidth } : {};

  return (
    <ContainerStyled
      className={className}
      containerType={containerType}
      css={{ ...manualWidth }}
      isFlex={isFlex}
    >
      {children}
    </ContainerStyled>
  );
};

/* eslint sort-keys: 0 */

export const ContainerStyled = styled("div", {
  margin: "0 auto",
  variants: {
    containerType: {
      default: {
        maxWidth: maxWidths.default,
      },
      wide: {
        maxWidth: maxWidths.wide,
      },
    },
    isFlex: {
      false: {},
      true: {
        display: "flex",
      },
    },
  },
  width: "100%",

  "@sm": {
    padding: "0 $gr2",
  },
  "@lg": {
    padding: "0 $gr3",
  },
});

export default Container;
