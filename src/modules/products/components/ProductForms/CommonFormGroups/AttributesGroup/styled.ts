import { Row } from "antd";
import styled from "styled-components";

export const AttributesHeader = styled(Row)`
  .attributes-header {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 20px 0px;
    justify-content: space-between;
    &__attribute {
      &--title {
        margin-bottom: 0px;
      }
      &--addbutton {
        color: #3e79f7;
        border: none;
        box-shadow: none;
      }
    }
  }
`;
