/* eslint-disable react/prop-types */
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import FormRow from '../../ui/FormRow';

import { useForm } from 'react-hook-form';
import { useCreateDevice } from './useCreateDevice';
import { useUpdateDevice } from './useUpdateDevice';
import Radio from '../../ui/Radio';

function CreateDeviceForm({ deviceToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = deviceToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : { status: 'active' },
  });
  const { errors } = formState;

  const { isCreating, createDevice } = useCreateDevice();
  const { isEditing, updateDevice } = useUpdateDevice();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession) {
      updateDevice(
        { newDeviceData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createDevice(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Device name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Manufacturer" error={errors?.manufacturer?.message}>
        <Input
          type="text"
          id="manufacturer"
          disabled={isWorking}
          {...register('manufacturer', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cost" error={errors?.cost?.message}>
        <Input
          type="number"
          id="cost"
          disabled={isWorking}
          {...register('cost', {
            required: 'This field is required',
            min: {
              value: 0,
              message: 'Cost should be at least 0',
            },
          })}
        />
      </FormRow>

      <FormRow label="Warranty (Years)" error={errors?.warranty?.message}>
        <Input
          type="number"
          id="warranty"
          disabled={isWorking}
          {...register('warranty', {
            required: 'This field is required',
            min: {
              value: 0,
              message: "Warranty can't be a negative number",
            },
          })}
        />
      </FormRow>

      <FormRow label="Serial Number" error={errors?.serialNumber?.message}>
        <Input
          type="text"
          id="serialNumber"
          disabled={isWorking}
          {...register('serialNumber', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Device photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          disabled={isWorking}
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow dateLabel="Purchase Date" error={errors?.purchaseDate?.message}>
        <Input
          type="date"
          id="purchaseDate"
          disabled={isWorking}
          {...register('purchaseDate', {
            required: 'This field is required',
            validate: {
              dateInPast: (value) => {
                const enteredDate = new Date(value);
                const currentDate = new Date();
                return (
                  enteredDate <= currentDate ||
                  'Please enter a date in the past'
                );
              },
            },
          })}
        />{' '}
      </FormRow>

      <FormRow dateLabel="Status">
        <Radio
          func={register('status')}
          // checked={!isEditSession ? true : null}
          id="active"
          value="active"
          name="status"
        >
          Active
        </Radio>
        <Radio
          func={register('status')}
          id="inactive"
          value="inactive"
          name="status"
        >
          Inactive
        </Radio>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit device' : 'Create new device'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateDeviceForm;
