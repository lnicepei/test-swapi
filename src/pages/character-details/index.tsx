import { Character } from '@/app/providers/RouterProvider';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input'; // Import the Input component
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';

export function CharacterDetailsPage() {
  const character = useLoaderData() as Character;
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: character.name,
      species: character.species,
      gender: character.gender,
      homeworld: character.homeworld,
      vehicles: character.vehicles,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const navigate = useNavigate(); // Add useNavigate hook

  return (
    <div className="container mx-auto p-4">
      <Button
        onClick={() => navigate('/characters')}
        variant="outline"
        className="mb-4"
      >
        Back
      </Button>{' '}
      {/* Add Back button */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="w-24 h-24">
              {/* <AvatarImage src={character.} alt={character.name} /> */}
              <AvatarFallback>{character.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">
                <Input {...register('name')} className="border p-1" />
              </CardTitle>
              <Badge variant="secondary" className="mt-2">
                <Input {...register('species')} className="border p-1" />
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="font-semibold">Species</dt>
                <dd>
                  <Input
                    {...register('species')}
                    className="border p-1 w-full"
                  />
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Gender</dt>
                <dd>
                  <Input
                    {...register('gender')}
                    className="border p-1 w-full"
                  />
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Origin</dt>
                <dd>
                  <Input
                    {...register('homeworld')}
                    className="border p-1 w-full"
                  />
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Vehicles</dt>
                <dd>
                  <Input
                    {...register('vehicles')}
                    className="border p-1 w-full"
                  />
                </dd>
              </div>
            </dl>
            <div className="mt-6">
              <Button type="submit" variant="outline">
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
