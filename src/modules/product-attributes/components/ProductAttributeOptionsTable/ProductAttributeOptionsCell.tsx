import { Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CustomProductAttributeOption, EditableCellProps } from "./types";

export const ProductAttributeOptionsCell = ({
  title,
  record,
  editable,
  children,
  dataIndex,
  handleSave,
  ...restProps
}: EditableCellProps) => {
  const { Text } = Typography;
  const [isEditing, setIsEditing] = useState(false);
  const { control, trigger, setValue, setFocus, getValues } =
    useFormContext<CustomProductAttributeOption>();

  useEffect(() => {
    if (isEditing) setFocus(`${dataIndex}`);
  }, [isEditing]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setValue(`${dataIndex}`, record[dataIndex]);
  };

  const save = () => {
    trigger(`${dataIndex}`).then((isValid) => {
      if (isValid) {
        const values = getValues();

        toggleEdit();
        handleSave({ ...record, ...values });
      }
    });
  };

  const EditableInput = isEditing ? (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      name={`${dataIndex}`}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          onBlur={save}
          autoComplete="off"
          onPressEnter={save}
          status={error && "error"}
          placeholder="Enter the option name"
        />
      )}
    />
  ) : (
    <Text
      onClick={toggleEdit}
      style={{ paddingRight: 24 }}
      className="editable-cell-value-wrap"
    >
      {children}
    </Text>
  );

  return <td {...restProps}>{editable ? EditableInput : children}</td>;
};
