import Repo from "./Repo";

const Repos = ({ repos}) => {
  return (
    <>
            <h1>User Repositories: </h1>

      {repos.map((repo) => (
        <Repo
        key={repo.id}
          repo={repo}
          
        />
      ))}
    </>
  );
};

export default Repos;


