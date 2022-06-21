import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { data, loading, error } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p className="alert alert-danger">Something went wrong</p>;

  return data.projects.length > 0 ? (
    <div className="row mt-5">
      {data.projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  ) : (
    <p>No Projects</p>
  );
};

export default Projects;
