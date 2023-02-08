import {
  Row,
  Col,
  Space,
  Input,
  Upload,
  Button,
  TreeSelect,
  Typography,
  Select,
} from "antd";
import {
  DollarCircleOutlined,
  PercentageOutlined,
  PlusOutlined,
  CloseOutlined,
  CheckOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import {
  FormGeneralStep,
  CustomCard,
  CustomBadge,
  AttributesHeader,
  CustomSpace,
} from "./styled";
import { AttributeProps, GeneralStepProps } from "./types";
import { FormItem } from "@/modules/common/components";
import { EMPTY_ATTRIBUTE } from "./constants";

export const GeneralStep = ({ $affixed }: GeneralStepProps) => {
  const { Text, Title } = Typography;
  const spacingCards = 15;
  const treeData = [
    {
      value: "parent 1",
      title: "parent 1",
      children: [
        {
          value: "parent 1-0",
          title: "parent 1-0",
          children: [
            {
              value: "leaf1",
              title: "leaf1",
            },
            {
              value: "leaf2",
              title: "leaf2",
            },
          ],
        },
        {
          value: "parent 1-1",
          title: "parent 1-1",
          children: [
            {
              value: "leaf3",
              title: <b style={{ color: "#08c" }}>leaf3</b>,
            },
          ],
        },
      ],
    },
  ];
  const tagsData = [
    { label: "Tag1", value: "tag1" },
    { label: "Tag2", value: "tag2" },
    { label: "Tag3", value: "tag3" },
  ];
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
  const [attributesForms, setAttributesForms] = useState<AttributeProps[]>([
    EMPTY_ATTRIBUTE,
  ]);
  const addNewAttribute = () => {
    const attributeData = EMPTY_ATTRIBUTE;
    attributeData.id = attributesForms.length;
    // console.log(attributesForms);
    setAttributesForms((currentAttributes) => [
      ...currentAttributes,
      attributeData,
    ]);
  };

  const removeAttribute = () => {
    console.log(attributesForms);
  };

  return (
    <FormGeneralStep
      layout="vertical"
      encType="multipart/form-data"
      $affixed={$affixed}
    >
      <Row gutter={[spacingCards, spacingCards]}>
        <Col span={15}>
          <Space
            direction="vertical"
            size={spacingCards}
            style={{ display: "flex" }}
          >
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
                    <Input
                      type="number"
                      min={0}
                      size="large"
                      prefix={<DollarCircleOutlined />}
                    />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="Tasks">
                    <Input
                      type="number"
                      min={0}
                      size="large"
                      prefix={<PercentageOutlined />}
                    />
                  </FormItem>
                </Col>
              </Row>
            </CustomCard>
            <CustomCard>
              <AttributesHeader>
                <Col span={24}>
                  <Space className="attributes-header">
                    <Title
                      level={5}
                      className="attributes-header__attribute--title"
                    >
                      Attributes
                    </Title>
                    <Button
                      type="link"
                      className="attributes-header__attribute--addbutton"
                      icon={<PlusCircleOutlined />}
                      onClick={addNewAttribute}
                      size="large"
                    >
                      Add new attribute
                    </Button>
                  </Space>
                </Col>
              </AttributesHeader>
              {attributesForms &&
                attributesForms.map((attribute, index) => (
                  <Row key={index} gutter={[24, 24]}>
                    <Col span={10}>
                      <FormItem>
                        <Text type="secondary">
                          Name/Type
                          <Text type="danger"> *</Text>
                        </Text>
                        <Select
                          style={{ width: "100%" }}
                          options={[
                            {
                              value: "lucy",
                              label: "Lucy",
                            },
                          ]}
                          size="large"
                        />
                      </FormItem>
                    </Col>
                    <Col span={10}>
                      <FormItem>
                        <Text type="secondary">
                          Values
                          <Text type="danger"> *</Text>
                        </Text>
                        <Select
                          mode="tags"
                          allowClear
                          style={{ width: "100%" }}
                          placeholder="Please select"
                          defaultValue={["tag1", "tag2"]}
                          // onChange={handleChange}
                          options={tagsData}
                          size="large"
                        />
                      </FormItem>
                    </Col>
                    <Col span={4}>
                      <CustomSpace align="end" size={20}>
                        <Button
                          type="link"
                          danger
                          size="large"
                          onClick={removeAttribute}
                        >
                          Remove
                        </Button>
                      </CustomSpace>
                    </Col>
                  </Row>
                ))}
            </CustomCard>
          </Space>
        </Col>
        <Col span={9}>
          <Space
            direction="vertical"
            size={spacingCards}
            style={{ display: "flex" }}
          >
            <CustomCard title="Photographs">
              <Space align="start" size={20} wrap>
                <CustomBadge
                  count={
                    <Space className="button-badge__button--checked">
                      <CheckOutlined />
                    </Space>
                  }
                >
                  <Space>
                    <Upload
                      id="image1"
                      listType="picture-card"
                      showUploadList={false}
                      multiple={false}
                      beforeUpload={(file) => {
                        const image = URL.createObjectURL(file);
                        setImage1Url(image);
                        return false;
                      }}
                    >
                      {image1Url ? (
                        <img
                          src={image1Url}
                          alt="category"
                          style={{
                            width: "100%",
                            maxHeight: "100%",
                            borderRadius: "8px",
                          }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Space>
                </CustomBadge>
                <CustomBadge
                  count={
                    <Button className="button-badge__button--remove">
                      <CloseOutlined />
                    </Button>
                  }
                >
                  <Space>
                    <Upload
                      id="image2"
                      listType="picture-card"
                      showUploadList={false}
                      multiple={false}
                      beforeUpload={(file) => {
                        const image = URL.createObjectURL(file);
                        setImage2Url(image);
                        return false;
                      }}
                    >
                      {image2Url ? (
                        <img
                          src={image2Url}
                          alt="category"
                          style={{
                            width: "100%",
                            maxHeight: "100%",
                            borderRadius: "8px",
                          }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Space>
                </CustomBadge>
                <CustomBadge
                  count={
                    <Button className="button-badge__button--remove">
                      <CloseOutlined />
                    </Button>
                  }
                >
                  <Space>
                    <Upload
                      id="image3"
                      listType="picture-card"
                      showUploadList={false}
                      multiple={false}
                      beforeUpload={(file) => {
                        const image = URL.createObjectURL(file);
                        setImage3Url(image);
                        return false;
                      }}
                    >
                      {image3Url ? (
                        <img
                          src={image3Url}
                          alt="category"
                          style={{
                            width: "100%",
                            maxHeight: "100%",
                            borderRadius: "8px",
                          }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Space>
                </CustomBadge>
                <CustomBadge
                  count={
                    <Button className="button-badge__button--remove">
                      <CloseOutlined />
                    </Button>
                  }
                >
                  <Space>
                    <Upload
                      id="image4"
                      listType="picture-card"
                      showUploadList={false}
                      multiple={false}
                      beforeUpload={(file) => {
                        const image = URL.createObjectURL(file);
                        setImage4Url(image);
                        return false;
                      }}
                    >
                      {image4Url ? (
                        <img
                          src={image4Url}
                          alt="category"
                          style={{
                            width: "100%",
                            maxHeight: "100%",
                            borderRadius: "8px",
                          }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Space>
                </CustomBadge>
              </Space>
              <Space className="custom-card__footer--text" size={1}>
                <p>Select main photo</p>
              </Space>
            </CustomCard>
            <CustomCard>
              <FormItem>
                <Title level={5}>Category</Title>
                <Text type="secondary">
                  <Text type="danger">*</Text>
                  Select a category
                </Text>
                <TreeSelect
                  showSearch
                  style={{ width: "100%" }}
                  dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                  placeholder="Please select"
                  allowClear
                  treeDefaultExpandAll
                  treeData={treeData}
                  size="large"
                />
              </FormItem>
              <FormItem>
                <Title level={5}>Tags</Title>
                <Text type="secondary">
                  Put labels on your products to improve your search
                </Text>
                <Select
                  mode="tags"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  defaultValue={["tag1", "tag2"]}
                  // onChange={handleChange}
                  options={tagsData}
                  size="large"
                />
              </FormItem>
            </CustomCard>
          </Space>
        </Col>
      </Row>
    </FormGeneralStep>
  );
};
