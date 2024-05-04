import React, { useState } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import ModalClose from "@mui/joy/ModalClose";

const AddButton = ({ title, inputTitles, inputTypes, onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(
    inputTitles.map((title, index) => ({
      title,
      type: inputTypes[index],
      value: "",
    }))
  );

  const handleInputChange = (index, event) => {
    const updatedFormData = [...formData];
    updatedFormData[index].value = event.target.value;
    setFormData(updatedFormData);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formObject = formData.reduce((acc, { title, value }) => {
      acc[title] = value;
      return acc;
    }, {});
    if (onSubmit) {
      onSubmit(formObject);
    }
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        {title}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose onClose={() => setOpen(false)} />
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            Fill in the information
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {formData.map((field, index) => (
                  <FormControl key={index}>
                    <FormLabel>{field.title}</FormLabel>
                    <Input
                      type={field.type}
                      autoFocus={index === 0}
                      value={field.value}
                      onChange={(event) => handleInputChange(index, event)}
                      required
                    />
                  </FormControl>
                ))}
                <Button type="submit">{title}</Button>
              </Stack>
            </form>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default AddButton;
