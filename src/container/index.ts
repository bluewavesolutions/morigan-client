import DIContainer, { object, get, IDIContainer, factory } from "rsdi";
import { Mediator } from "../game/core/events/Mediator";
import { EngineStore } from "../game/store/EngineStore";
import { KeyboardManager } from "../game/managers/KeyboardManager";
import { GameWindow } from "../game/core/renderer/GameWindow";
import { AnimationManager } from "../game/core/animations/AnimationManager";
import { Camera } from "../game/components/Camera";
import { Ground } from "../game/components/Ground";
import { Character } from "../game/components/Character";
import { Tooltip } from "../game/components/Tooltip";
import { OtherCharactersManager } from "../game/managers/OtherCharactersManager";
import { ServerEventInterpreter } from "../game/interpeters/ServerEventInterpreter";
import { MouseManager } from "../game/managers/MouseManager";
import { Renderer } from "../game/core/renderer/Renderer";
import { Server } from "../game/communication/Server";

export class Container {
    public getContainer() : IDIContainer {
      const container = new DIContainer();
      container.addDefinitions({
          "Mediator": factory(() => new Mediator()),
          "EngineStore": factory(() => new EngineStore()),
          "KeyboardManager": factory((container: IDIContainer) => 
            new KeyboardManager(container.get("Mediator"))),
          "GameWindow": factory(() => new GameWindow()),
          "AnimationManager": factory(() => new AnimationManager()),
          "Camera": factory((container: IDIContainer) => {
            return new Camera(container.get("Mediator"),
              container.get("GameWindow"),
              container.get("AnimationManager"));
          }),
          "Ground": factory((container: IDIContainer) => {
            return new Ground(container.get("Mediator"),
              container.get("Camera"));
          }),
          "Character": factory((container: IDIContainer) => {
            return new Character(
              container.get("Mediator"),
              container.get("EngineStore"),
              container.get("Camera"),
              container.get("AnimationManager")
            );
          }),
          "Tooltip": factory((container: IDIContainer) => {
            return new Tooltip(container.get("Mediator"),
              container.get("Camera"))
          }),
          "OtherCharactersManager": factory((container: IDIContainer) => {
            return new OtherCharactersManager(container.get("Mediator"),
              container.get("AnimationManager"),
              container.get("Camera")
            );
          }),
          "ServerEventInterpreter": factory((container: IDIContainer) => {
            return new ServerEventInterpreter(container.get("Mediator"),
              container.get("EngineStore"));
          }),
          "MouseManager": factory((container: IDIContainer) => {
            return new MouseManager(container.get("Mediator"));
          }),
          "Server": factory((container: IDIContainer) => {
            return new Server(container.get("Mediator"),
              container.get("EngineStore"));
          }),
          "Renderer": object(Renderer).construct(
            get("AnimationManager"),
            get("GameWindow"),
            get("Character"),
            get("Ground"),
            get("Tooltip"),
            get("OtherCharactersManager")
          )
      });
  
      return container;
    }
}