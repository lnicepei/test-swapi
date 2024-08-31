import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useCharacter, useUpdateCharacter } from './useCharacter';

export function CharacterDetailsPage() {
  const { id } = useParams();
  const { data } = useCharacter(id ?? '');
  const { enqueueSnackbar } = useSnackbar();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: data?.name,
      height: data?.height,
      mass: data?.mass,
      gender: data?.gender,
    },
  });

  const { mutate } = useUpdateCharacter();

  const onSubmit = (formData: any) => {
    try {
      const res = {
        ...data,
        ...formData,
        edited: new Date().toISOString(),
      };

      mutate({ data: res, id: id ?? '' });

      enqueueSnackbar('Character updated successfully', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('Error updating character', {
        variant: 'error',
      });
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <Button
        onClick={() => navigate('/characters')}
        variant="outline"
        className="mb-4 sm:mb-6 text-lg sm:text-xl"
      >
        Back
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="max-w-3xl mx-auto p-4 sm:p-6">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
              <AvatarFallback className="text-4xl sm:text-5xl">
                {data?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
                <div>
                  <label
                    className="font-semibold text-lg sm:text-xl"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <Input
                    {...register('name')}
                    id="name"
                    placeholder="Name"
                    className="border p-2 text-lg sm:text-xl"
                  />
                </div>
                <div>
                  <label
                    className="font-semibold text-lg sm:text-xl"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <Input
                    {...register('gender')}
                    id="gender"
                    placeholder="Gender"
                    className="border p-2 w-full text-lg sm:text-xl"
                  />
                </div>
                <div>
                  <label
                    className="font-semibold text-lg sm:text-xl"
                    htmlFor="height"
                  >
                    Height
                  </label>
                  <Input
                    {...register('height')}
                    id="height"
                    placeholder="Height"
                    className="border p-2 w-full text-lg sm:text-xl"
                    type="number"
                  />
                </div>
                <div>
                  <label
                    className="font-semibold text-lg sm:text-xl"
                    htmlFor="mass"
                  >
                    Mass
                  </label>
                  <Input
                    {...register('mass')}
                    id="mass"
                    placeholder="Mass"
                    type="number"
                    className="border p-2 w-full text-lg sm:text-xl"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-6 sm:mt-8">
              <Button type="submit" className="text-lg sm:text-xl p-2 w-full">
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
