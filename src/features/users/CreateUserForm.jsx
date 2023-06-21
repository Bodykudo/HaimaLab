/* eslint-disable react/prop-types */
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import FormRow from '../../ui/FormRow';

import { useForm } from 'react-hook-form';
import Radio from '../../ui/Radio';
import { useCreateUser } from './useCreateUsers';
import { useSignup } from '../authentication/useSignup';
import { useUpdateUser } from './useUpdateUser';
import Select from '../../ui/Select';
import { capitalize } from '../../utils/helpers';

function CreateUserForm({
  userToEdit = {},
  onCloseModal,
  userRole,
  healthRecords,
}) {
  const { id: editId, ...editValues } = userToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, getValues, formState } = useForm({
    defaultValues: isEditSession
      ? editValues
      : { sex: 'male', bloodType: 'A+' },
  });
  const { errors } = formState;

  const { signup, isLoading } = useSignup();
  const { createUser, isCreating } = useCreateUser();
  const { updateUser, isEditing } = useUpdateUser();

  const isWorking = isLoading || isCreating || isEditing;

  const bloodTypes = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
  ];

  function onSubmit({
    password,
    fullName,
    sex,
    email,
    birthDate,
    avatar,
    mobile,
    nationalId,
    HB,
    HCT,
    RBC,
    MCV,
    MCH,
    MCHC,
    WBC,
    PLT,
    bloodType,
  }) {
    const userAvatar = typeof avatar === 'string' ? avatar : avatar[0];

    if (isEditSession) {
      updateUser(
        // { newDeviceData: { ...data, avatar }, id: editId },
        {
          newUserData: {
            fullName,
            sex,
            email,
            birthDate,
            avatar: userAvatar,
            mobile,
            nationalId,
            HB,
            HCT,
            RBC,
            MCV,
            MCH,
            MCHC,
            WBC,
            PLT,
            bloodType,
          },
          id: editId,
        },
        {
          onSuccess: () => {
            // reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      const userId = Math.floor(Math.random() * 10000);
      createUser(
        {
          fullName,
          sex,
          email,
          birthDate,
          avatar: userAvatar,
          userRole,
          userId: userId,
          mobile,
          nationalId,
        },
        // { fullName, sex, email, userRole, userId: userId },
        {
          onSuccess: () => {
            // reset();
            onCloseModal?.();
          },
        }
      );

      signup(
        { fullName, email, password, userRole, userId }
        // { onSettled: () => reset() }
      );
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      {!healthRecords ? (
        <>
          <FormRow label="Full name" error={errors?.fullName?.message}>
            <Input
              type="text"
              id="fullName"
              disabled={isWorking}
              {...register('fullName', {
                required: 'This field is required',
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: 'Invalid characters in the full name',
                },
              })}
            />
          </FormRow>
          <FormRow dateLabel="Birth Date" error={errors?.birthDate?.message}>
            <Input
              type="date"
              id="birthDate"
              disabled={isWorking}
              {...register('birthDate', {
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
          <FormRow dateLabel="Sex">
            <Radio func={register('sex')} id="male" value="male" name="sex">
              Male
            </Radio>
            <Radio func={register('sex')} id="female" value="female" name="sex">
              Female
            </Radio>
          </FormRow>
          {!isEditSession ? (
            <FormRow label="Email" error={errors?.email?.message}>
              <Input
                type="email"
                id="email"
                disabled={isWorking}
                {...register('email', {
                  required: 'This field is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please provide a valid email address',
                  },
                })}
              />
            </FormRow>
          ) : null}
          {!isEditSession ? (
            <FormRow
              label="Password (min 8 characters)"
              error={errors?.password?.message}
            >
              <Input
                type="password"
                id="password"
                disabled={isWorking}
                {...register('password', {
                  required: 'This field is required',
                  minLength: {
                    value: 8,
                    message: 'Password needs a minimum of 8 characters',
                  },
                })}
              />
            </FormRow>
          ) : null}
          {!isEditSession ? (
            <FormRow
              label="Confirm password"
              error={errors?.passwordConfirm?.message}
            >
              <Input
                type="password"
                id="passwordConfirm"
                disabled={isWorking}
                {...register('passwordConfirm', {
                  required: 'This field is required',
                  validate: (value) =>
                    value === getValues().password || 'Passwords need to match',
                })}
              />
            </FormRow>
          ) : null}
          <FormRow label="National ID" error={errors?.nationalId?.message}>
            <Input
              type="text"
              id="nationalId"
              disabled={isWorking}
              {...register('nationalId', {
                required: 'This field is required',
                minLength: {
                  value: 14,
                  message: 'National ID needs a minimum of 14 number',
                },
                validate: {
                  isNumeric: (value) =>
                    /^\d+$/.test(value) || 'Please enter numbers only',
                },
              })}
            />
          </FormRow>
          <FormRow label="Mobile" error={errors?.mobile?.message}>
            <Input
              type="text"
              id="mobile"
              disabled={isWorking}
              {...register('mobile', {
                required: 'This field is required',
                pattern: {
                  value: /^(\+20|0)?(11|12|10|15)[0-9]{8}$/,
                  message: 'Please provide a valid Mobile Number',
                },
              })}
            />
          </FormRow>
          <FormRow
            label={capitalize(`${userRole} avatar`)}
            error={errors?.avatar?.message}
          >
            <FileInput
              id="avatar"
              accept="image/*"
              type="file"
              disabled={isWorking}
              {...register('avatar', {
                required: isEditSession ? false : 'This field is required',
              })}
            />
          </FormRow>
        </>
      ) : null}

      {healthRecords ? (
        <>
          <FormRow dateLabel="Blood type">
            <Select
              name="bloodType"
              func={register('bloodType')}
              options={bloodTypes}
            />{' '}
          </FormRow>

          {/* Average range: 13.5-17.5 g/dL (for adult males) and 12.0-15.5 g/dL (for adult females) */}
          <FormRow label="Hemoglobin (Hb) (g/dL)" error={errors?.HB?.message}>
            <Input
              type="float"
              id="HB"
              disabled={isWorking}
              {...register('HB', {
                required: 'This field is required',
              })}
            />
          </FormRow>

          {/* Average range: 38.8-50% (for adult males) and 34.9-44.5% (for adult females) */}
          <FormRow label="Hematocrit (Hct) (%)" error={errors?.HCT?.message}>
            <Input
              type="float"
              id="HCT"
              disabled={isWorking}
              {...register('HCT', {
                required: 'This field is required',
              })}
            />
          </FormRow>

          {/* Average range: 4.5-5.5 x10^6/µL (for adult males) and 4.0-5.0 x10^6/µL (for adult females) */}
          <FormRow
            label="Red Blood Cell Count (RBCs) (x10^6/µL)"
            error={errors?.RBC?.message}
          >
            <Input
              type="float"
              id="RBC"
              disabled={isWorking}
              {...register('RBC', {
                required: 'This field is required',
              })}
            />
          </FormRow>

          {/* Average range: 4.5-11.0 x10^3/µL */}
          <FormRow
            label="White Blood Cell Count (WBCs) (x10^6/µL)"
            error={errors?.WBC?.message}
          >
            <Input
              type="float"
              id="WBC"
              disabled={isWorking}
              {...register('WBC', {
                required: 'This field is required',
              })}
            />
          </FormRow>

          {/* Average range: 150-450 x10^3/µL */}
          <FormRow
            label="Platelet Count (Plt) (x10^3/µL)"
            error={errors?.PLT?.message}
          >
            <Input
              type="float"
              id="PLT"
              disabled={isWorking}
              {...register('PLT', {
                required: 'This field is required',
              })}
            />
          </FormRow>

          {/* Average range: 80-96 fL */}
          <FormRow
            label="Mean Corpuscular Volume (MCV) (fL)"
            error={errors?.MCV?.message}
          >
            <Input
              type="float"
              id="MCV"
              disabled={isWorking}
              {...register('MCV', {
                required: 'This field is required',
              })}
            />
          </FormRow>

          {/* Average range: 27-33 pg */}
          <FormRow
            label="Mean Corpuscular Hemoglobin (MCH) (pg)"
            error={errors?.MCH?.message}
          >
            <Input
              type="float"
              id="MCH"
              disabled={isWorking}
              {...register('MCH', {
                required: 'This field is required',
              })}
            />
          </FormRow>

          {/* Average range: 32-36 g/dL */}
          <FormRow
            label="Mean Corpuscular Hemoglobin Concentration (MCHC) (g/dL)"
            error={errors?.MCHC?.message}
          >
            <Input
              type="float"
              id="MCHC"
              disabled={isWorking}
              {...register('MCHC', {
                required: 'This field is required',
              })}
            />
          </FormRow>
        </>
      ) : null}

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
          {isEditSession ? `Edit ${userRole}` : `Create new ${userRole}`}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateUserForm;
