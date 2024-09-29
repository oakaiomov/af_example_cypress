import DataGen from './data.gen'

export default class FOM_Entity {
  dataGen() {
    return DataGen
  }

  comment(ids: { project?: string; task?: string }): Comments.Payload.Create {
    return {
      project_id: ids.project,
      task_id: ids.task,
      content: DataGen.content()
    }
  }

  label(
    name: string = DataGen.nameStr(),
    order: number = DataGen.order(),
    color: string = DataGen.color(),
    is_favorite = false
  ): Labels.Payload.Create {
    return { name, order, color, is_favorite }
  }

  project(
    parent_id?: string,
    is_favorite: boolean = false,
    color: string = DataGen.color(),
    view_style: Projects.ViewStyle = DataGen.viewStyle()
  ): Projects.Payload.Create {
    return {
      parent_id,
      name: DataGen.nameStr(),
      color,
      view_style,
      is_favorite
    }
  }

  section(project_id: string, order: number = 1): Sections.Payload.Create {
    return {
      order,
      project_id,
      name: DataGen.nameStr()
    }
  }

  task(
    ids?: { project?: string; section?: string; parent?: string },
    labels: string[] = []
  ): Tasks.Payload.Create {
    const section: Tasks.Payload.Create = {
      content: DataGen.content(),
      description: DataGen.description(),
      order: 0,
      labels,
      priority: 0,
      due_datetime: new Date().toISOString(),
      duration: 15,
      duration_unit: 'minute'
    }

    if (ids && ids.project) section.project_id = ids.project
    if (ids && ids.section) section.section_id = ids.section
    if (ids && ids.parent) section.parent_id = ids.parent

    return section
  }
}
