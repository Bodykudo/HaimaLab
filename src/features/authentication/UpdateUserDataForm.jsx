/* eslint-disable react/prop-types */
import { useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUpdateUser } from '../users/useUpdateUser';

function UpdateUserDataForm({ userId, email, fullName, avatar }) {
  const { updateUser, isEditing } = useUpdateUser();
  const [newFullName, setFullName] = useState(fullName);
  const [newAvatar, setAvatar] = useState(avatar);

  function handleSubmit(e) {
    e.preventDefault();
    const userAvatar = typeof newAvatar === 'string' ? newAvatar : newAvatar[0];
    if (!newFullName) return;
    updateUser({
      newUserData: { fullName: newFullName, avatar: userAvatar },
      id: userId,
    });
  }

  function handleCancel() {
    setFullName(fullName);
    setAvatar(avatar);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={newFullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="newAvatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files)}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isEditing}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isEditing}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
