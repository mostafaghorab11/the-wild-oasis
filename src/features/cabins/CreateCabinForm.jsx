import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { createAndEditCabin } from '../../services/apiCabins';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editCabinData } = cabinToEdit;
  const isEdit = Boolean(editId);
  // console.log(editCabinData);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit ? editCabinData : {},
  });

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: (cabin) => createAndEditCabin(cabin, null),
    onSuccess: () => {
      toast.success('Cabin successfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createAndEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  const isLoading = isCreating || isEditing;

  async function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    // console.log(typeof data.image);
    console.log(image);

    isEdit
      ? editCabin({ newCabinData: { ...data, image: image }, id: editId })
      : createCabin({ ...data, image: image });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          disabled={isLoading}
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Maximum capacity must be greater than 0',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice?.message}>
        <Input
          disabled={isLoading}
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Regular price must be greater than 0',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          disabled={isLoading}
          type="number"
          id="discount"
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount must be less than or equal to regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors.description?.message}
      >
        <Textarea
          disabled={isLoading}
          type="text"
          id="description"
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isLoading}
          // defaultValue={isEdit ? editCabinData.image : ''}
          {...register('image', {
            required: isEdit ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEdit ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
