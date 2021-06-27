export enum NotificationStatus {
  New = 'New', 
  Read = 'Read',
  Archived = 'Archived'
}

export enum NotificationType {
  NewArgument = 'NewArgument',
  NewArgumentInModDiscussion = 'NewArgumentInModDiscussion',
  YouHaveBeenAddedAsMod = 'YouHaveBeenAddedAsMod',
  YouHaveBeenRemovedAsMod = 'YouHaveBeenRemovedAsMod',
  ModHasBeenRemovedFromYourDiscussion = 'ModHasBeenRemovedFromYourDiscussion',
  ModHasBeenAddedToYourDiscussion = 'ModHasBeenAddedToYourDiscussion',
  ModHasBeenRemovedFromDiscussion = 'ModHasBeenRemovedFromDiscussion',
  ModHasBeenAddedToDiscussion = 'ModHasBeenAddedToDiscussion',
  NoModeratorsAddedToDiscussion = 'NoModeratorsAddedToDiscussion',
  ThereAreUnmoderatedThesesInDiscussion = 'ThereAreUnmoderatedThesesInDiscussion'
}

//TODO: Replace with numeric values
export enum NotificationPriority {
  Important = 'Important',
  Regular = 'Regular',
  Unimportant = 'Unimportant'
}