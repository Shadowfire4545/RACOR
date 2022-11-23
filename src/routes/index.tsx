import { component$, Resource, useResource$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

//MTAzNTE4Mzg2MjYyMTQyMTYzOA.GzctnO.MptJvT3glQyjLBkmEj7ikrxhMnUbQu_ldnBROU
interface guild {
  id: string,
  name: string,
  icon?: string,
}

export default component$(() => {
  // Use useResource$() to set up how the data is fetched from the server.
  // See the example for Fetching Data in the text on the left.
  const reposResource = useResource$<guild[]>(({ cleanup }) => {

    const controller = new AbortController();
    cleanup(() => controller.abort());

    // Fetch the data and return the promises.
    return getGuilds(controller);
  });

  return (
    <div>
      <Resource
        value={reposResource}
        onResolved={(g: guild[]) => (
          <>
            {g.map(g => (
              <div>
              <span>{g.name}</span>
              <span>{g.id}</span>
              </div>
            ))}
          </>
        )}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};

export async function getGuilds(
  controller?: AbortController
): Promise<guild[]> {
  const resp = await fetch(`https://discord.com/api/v10/users/@me/guilds`, {
    headers: {
      Authorization: 'Bot MTAzNTE4Mzg2MjYyMTQyMTYzOA.GzctnO.MptJvT3glQyjLBkmEj7ikrxhMnUbQu_ldnBROU'
    },
    signal: controller?.signal,
  });
  console.log('FETCH resolved');
  const json = await resp.json();
  return Array.isArray(json)
    ? json.map((g: guild) => g)
    : Promise.reject(json);
}