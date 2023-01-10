import { Card, Row, Col, Space, Input, Upload, UploadFile } from "antd";
import {
  DollarCircleOutlined,
  PercentageOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { FormGeneralStep, CustomCard } from "./styled";
import { GeneralStepProps } from "./types";
import { FormItem } from "@/modules/common/components";

export const GeneralStep = ({ $affixed }: GeneralStepProps) => {
  const propsCount = {
    formatter: (info: { value: string; count: number; maxLength?: number }) =>
      `${info.count} of ${info.maxLength} characters`,
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Image</div>
    </div>
  );
  const [image1Url, setImage1Url] = useState<string>();
  const [image2Url, setImage2Url] = useState<string>();
  const [image3Url, setImage3Url] = useState<string>();
  const [image4Url, setImage4Url] = useState<string>();
  return (
    <FormGeneralStep
      layout="vertical"
      encType="multipart/form-data"
      $affixed={$affixed}
    >
      <Row gutter={[16, 16]}>
        <Col span={15}>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <CustomCard title="Basic Information">
              <FormItem label="Product name">
                <Input size="large" placeholder="Product name" />
              </FormItem>
              <FormItem label="Description">
                <Input.TextArea
                  size="large"
                  placeholder="Short product description"
                  rows={4}
                  showCount={propsCount}
                  maxLength={250}
                />
              </FormItem>
            </CustomCard>
            <CustomCard title="Additional product data">
              <FormItem label="Description">
                <Input.TextArea
                  size="large"
                  placeholder="Description"
                  rows={8}
                  showCount={propsCount}
                  maxLength={750}
                />
              </FormItem>
            </CustomCard>
            <CustomCard title="Price">
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  <FormItem label="Base price">
                    <Input size="large" prefix={<DollarCircleOutlined />} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="Tasks">
                    <Input size="large" prefix={<PercentageOutlined />} />
                  </FormItem>
                </Col>
              </Row>
            </CustomCard>
          </Space>
        </Col>
        <Col span={9}>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <CustomCard title="Photographs">
              <Upload
                id="image1"
                listType="picture-card"
                showUploadList={false}
                multiple={false}
                beforeUpload={(file) => {
                  const image = URL.createObjectURL(file);

                  // setValue("image", file);
                  setImage1Url(image);

                  return false;
                }}
              >
                {image1Url ? (
                  <img
                    src={image1Url}
                    alt="category"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </CustomCard>
            <Card>asñdkjasñ</Card>
          </Space>
        </Col>
      </Row>
    </FormGeneralStep>
  );
};
