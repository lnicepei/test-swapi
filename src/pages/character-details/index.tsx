import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useCharacter, useUpdateCharacter } from './useCharacter';

export function CharacterDetailsPage() {
  const { id } = useParams();
  const { data } = useCharacter(id ?? '');

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: data?.name,
      species: data?.species.join(', '),
      gender: data?.gender,
      homeworld: data?.homeworld,
      vehicles: data?.vehicles,
    },
  });

  const { mutate } = useUpdateCharacter();

  const onSubmit = (formData: any) => {
    const res = {
      ...data,
      ...formData,
      species: formData.species.split(','),
      edited: new Date().toISOString(),
    };

    mutate({ data: res, id: id ?? '' });
  };

  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-8">
      <Button
        onClick={() => navigate('/characters')}
        variant="outline"
        className="mb-6 text-xl"
      >
        Back
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="max-w-3xl mx-auto p-6">
          <CardHeader className="flex flex-row items-center gap-6">
            <Avatar className="w-32 h-32">
              <AvatarFallback className="text-5xl">
                {data?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-5xl">
                <Input
                  {...register('name')}
                  placeholder="Name"
                  className="border p-2 text-xl"
                />
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-6">
              <div>
                <dt className="font-semibold text-xl">Species</dt>
                <dd>
                  <Input
                    {...register('species')}
                    placeholder="Species"
                    className="border p-2 w-full text-xl"
                  />
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-xl">Gender</dt>
                <dd>
                  <Input
                    {...register('gender')}
                    placeholder="Gender"
                    className="border p-2 w-full text-xl"
                  />
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-xl">Origin</dt>
                <dd>
                  <Input
                    {...register('homeworld')}
                    placeholder="Origin"
                    className="border p-2 w-full text-xl"
                  />
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-xl">Vehicles</dt>
                <dd>
                  <Input
                    {...register('vehicles')}
                    placeholder="Vehicles"
                    className="border p-2 w-full text-xl"
                  />
                </dd>
              </div>
            </dl>
            <div className="mt-8">
              <Button type="submit" variant="outline" className="text-xl p-2">
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
