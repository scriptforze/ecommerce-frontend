export const form = {
  title: {
    create: "Nueva Categoría",
    update: "Editar Categoría",
  },
  inputs: {
    name: {
      label: "Nombre",
      placeholder: "Nombre de la categoría",
    },
    parent: {
      label: "Categoría padre",
      placeholder: "Selecciona una categoría padre",
    },
    image: {
      label: "Imagen",
      uploading: "Subiendo imagen...",
      placeholder: "Seleccione una imagen",
    },
  },
  submit: {
    create: "Guardar",
    update: "Actualizar",
  },
  messages: {
    success: {
      create: {
        title: "Categoría creada",
        msg: "La categoría ha sido creada con éxito",
      },
      update: {
        title: "Categoría actualizada",
        msg: "La categoría ha sido actualizada con éxito",
      },
    },
  },
};
