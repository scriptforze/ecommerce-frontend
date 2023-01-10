import { Card, Steps, Row, Col, Button } from "antd";
import { useState } from "react";
import { ArrowRightOutlined, CloseOutlined } from "@ant-design/icons";
import { PageHeader } from "@/modules/common/components/PageHeader/PageHeader";
import { BREADCRUMB_ITEMS, STEPS_ITEMS } from "./constants";
import { CustomAffixContainer, GeneralStep } from "../../components";
import { StyledSpace, StyledSpaceButtons } from "./styled";

export const CreateProduct = () => {
  const [affixed, setAffixed] = useState(false);
  document.title = "Ecommerce - New Product";

  const onAffixChanged = (affixValue?: boolean) => {
    const isAffixed = affixValue !== undefined ? affixValue : false;
    setAffixed(isAffixed);
  };

  return (
    <>
      <PageHeader title="New product" breadCrumbItems={BREADCRUMB_ITEMS} />
      <CustomAffixContainer
        offsetTop={64}
        $affixed={affixed}
        onChange={onAffixChanged}
      >
        <Card>
          <Row justify="space-evenly" gutter={[24, 24]}>
            <Col span={7}>
              <StyledSpace $affixed={affixed}>
                <h2>{BREADCRUMB_ITEMS[1].title}</h2>
              </StyledSpace>
            </Col>
            <Col span={10}>
              <Steps
                current={0}
                labelPlacement="vertical"
                items={STEPS_ITEMS}
              />
            </Col>
            <Col span={7}>
              <StyledSpaceButtons className="space-buttons">
                <Button
                  className="space-buttons__button--discard"
                  icon={<CloseOutlined />}
                >
                  Discard
                </Button>
                <Button
                  className="space-buttons__button--continue"
                  icon={<ArrowRightOutlined />}
                >
                  Next
                </Button>
              </StyledSpaceButtons>
            </Col>
          </Row>
        </Card>
      </CustomAffixContainer>
      <GeneralStep $affixed={affixed} />
    </>
  );
};
