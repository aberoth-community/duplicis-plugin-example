import { Plugin } from '@duplicis/core'
import { PreactPlugin } from '@duplicis/plugin-preact'
import {
  AppMixin as SettingsAppMixin,
  GameMixin as SettingsGameMixin,
} from '@duplicis/plugin-settings'

/**
 * Example plugin icon.
 * @returns Icon
 */
export const Icon = () => <span>💩</span>

/**
 * Example plugin menu.
 * @returns Menu
 */
export const Menu = () => {
  return (
    <div>
      <h2>Hello from the ExamplePlugin!</h2>
    </div>
  )
}

/**
 * Example plugin.
 * @class
 */
export class ExamplePlugin extends Plugin {
  static override name = '@duplicis/plugin-example'
  static override icon = PreactPlugin.component(Icon)
  static override menu = PreactPlugin.component(Menu)

  override async onLoad() {
    console.log(`Let's do this!`)
  }

  override async onExit() {
    console.log('Oh... well, at least I have chicken...')
  }
}

/** Example plugin app mixin. */
export const AppMixin = ExamplePlugin.patch('app', SettingsAppMixin.constructor, (App) => {
  return class extends App {
    constructor() {
      super()
      console.log(
        `I apply after the settings plugin! screen_constant = ${(this as any).screen_constant}`,
      )
    }
  }
})

/** Example plugin game mixin. */
export const GameMixin = ExamplePlugin.patch('game', SettingsGameMixin.constructor, (Game) => {
  return class extends Game {
    override run(
      username: string,
      password: string,
      scaleUp: number,
      scaleDown: number,
      fontSize: number,
      ipAddress: string,
      screenDefinition: number,
      encryptPassword: number,
      reloadOnDeath: boolean,
      javaVersion: string,
    ): void {
      console.log('Hello I run before "run"!', ExamplePlugin.instance)
      super.run(
        username,
        password,
        scaleUp,
        scaleDown,
        fontSize,
        ipAddress,
        screenDefinition,
        encryptPassword,
        reloadOnDeath,
        javaVersion,
      )
      console.log(`Hello I run afterwards`)
    }
  }
})

/** Example plugin translations. */
export const i18n = ExamplePlugin.translations({
  en: {
    display_name: 'example',
    description: 'example plugin.',
  },
  es: {
    display_name: 'ejemplo',
    description: 'complemento de ejemplo.',
  },
  'pt-BR': {
    display_name: 'exemplo',
    description: 'plugin de exemplo.',
  },
})

export default ExamplePlugin
