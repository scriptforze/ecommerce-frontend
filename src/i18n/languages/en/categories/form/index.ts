export const form = {
  title: {
    create: "New Category",
    update: "Edit Category",
  },
  inputs: {
    name: {
      label: "Name",
      placeholder: "Category Name",
    },
    parent: {
      label: "Parent Category",
      placeholder: "Select a parent category",
    },
    image: {
      label: "Image",
      uploading: "Uploading image...",
      placeholder: "Select an image",
    },
  },
  submit: {
    create: "Save",
    update: "Update",
  },
  messages: {
    success: {
      create: {
        title: "Category created",
        msg: "The category has been created successfully",
      },
      update: {
        title: "Category updated",
        msg: "The category has been updated successfully",
      },
    },
  },
};
